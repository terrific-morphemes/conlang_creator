import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Input from '@material-ui/core/Input'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {makeStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import axios from 'axios'
import logo from '../resources/logo.svg';
import parameters from '../resources/parameters.json'
import '../styles/App.css';
//import Table from 'react-bootstrap/Table'
import Layout from './Layout'

const useStyles = makeStyles(theme=> ({
  formControl: {
    margin: theme.spacing(1),
    minWidth:120,
  }}))


function VocabTable(props){
  const vocabRows = props.vocab.map(word => {
    return(
      <TableRow>
        <TableCell>{word.meaning}</TableCell>
        <TableCell>{word.lemma}</TableCell>
        <TableCell>{word.pos}</TableCell>
        <TableCell>{word.category}</TableCell>
      </TableRow>
    )
  })
  return(
    <div className="vocabTable">
      <h4>Vocab</h4>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meaning</TableCell>
            <TableCell>Lemma</TableCell>
            <TableCell>Part of speech</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocabRows}
        </TableBody>
      </Table>
     </TableContainer>
    </div>
  )
}

function PhonemePicker(props){
}

function ParameterReport(props){
  let conlangParams = props.conlangParams
  const paramsList = Object.entries(props.conlangParams).map(([param, setting]) => {
          return(<ListItem key={param}>{param}: {setting === true || setting === false ? setting.toString() : setting}</ListItem>)
   })
  return(
    <List className="paramsList">{paramsList}</List>
  )
}

function ParameterForm(props){
  let parameters = props.parameters
  let conlangParams = props.conlangParams
  const paramsMenu = parameters.map(parameter => {
    let labelName = parameter['attribute'] + '-label'
    let parameterName = parameter['attribute']
    let parameterSettings = parameter['setting']
    let parameterDisplayName = parameter['display']
    if (parameterSettings.includes("number")){
      return(<FormGroup controlId={parameterName}>
               <FormLabel>{parameterDisplayName}</FormLabel>
               <Input type="number" onChange={props.handleChange(parameterName)} value={conlangParams[parameterName]}/>
             </FormGroup>
      )
      }else if(parameterSettings.includes("bool")) {
         return(<FormGroup controlId={parameterName}>
                  <FormControlLabel
                  control={<Checkbox
                      type="checkbox" 
                      onChange={props.handleChange(parameterName)} 
                      checked={(conlangParams[parameterName] === true)}/>}
	          label={parameterDisplayName}
                   />
                </FormGroup>
         )
      } else {
         let settingButtons = parameterSettings.map(setting => {
           return(
             <FormControlLabel
             control={<Radio 
                  type="radio" 
                  value={setting}
                  name={parameterName} 
                  onChange={props.handleChange(parameterName)} 
                  checked={(conlangParams[parameterName] === setting)}/>}
                label={setting}
             />
           )
         })
         return(
           <RadioGroup controlId={parameterName}>
             <FormLabel>{parameterDisplayName}</FormLabel>
             {settingButtons}
           </RadioGroup>
         )}
    })
    return(
      <FormControl className="conlangParams" onSubmit={props.handleSubmit}>
        {paramsMenu}
        <Button className="updateButton"  onClick={props.handleSubmit}>Update</Button>
      </FormControl>
    )
}

function ParameterPicker(props){
  const parameters = props.parameters
  const paramsMenu = parameters.map(parameter => {
    let labelName = parameter['attribute'] + '-label'
    let parameterName = parameter['attribute']
    let parameterSettings = parameter['setting']
    let parameterDisplayName = parameter['display']
    let settingButtons = parameterSettings.map(setting=>{
      return(
        <Dropdown.Item key={setting} name={parameterName} value={setting} onClick={props.handleUpdateParams} as="button">
          {setting}
        </Dropdown.Item>
      )})
    return (
          <DropdownButton 
             key={parameterDisplayName} 
             className="parameterSetting" 
             title={parameterDisplayName}>
               {settingButtons}
          </DropdownButton>
    )
    })
    return(
      <ButtonToolbar className="conlangParams">
        {paramsMenu}
      </ButtonToolbar>
    )
}


function App(props){
  const [conlangParams, setConlangParams] = useState({})
  const [vocab, setVocab] = useState([])

  const clearParams = () => {
    let emptyParams = {}
    parameters['parameters'].map(parameter => {
      setConlangParams(prevParams => {return{
         ...prevParams,
         [parameter['attribute']]: ''
       }
    })})
  }

  useEffect(() => {randomParams()}, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleGetLexicon()
  }

  const handleChange = name => (e) => {
    const {id, value, type} = e.target
    console.log(name, id, value, type)
    if (type === "checkbox") {
      setConlangParams((prevParams) => {return {...prevParams,[name]:!prevParams[name]}})
    } else if (type === "radio") {
       setConlangParams((prevParams) => {return {...prevParams, [name]:value}})
    } else {
      setConlangParams((prevParams) => {return {...prevParams, [name]:value}})
    }
 }

  const handleUpdateParams = (e) => {
    let {name, value} = e.target
    setConlangParams(prevParams => {return {
         ...prevParams,
         [name]:value}})
  }

  const randomParams = (e) => {
    parameters['parameters'].map((parameter) => {
       let parameterName = parameter['attribute']
       let options = parameter['setting']
       if (options.includes("bool")){options = [true, false]}
       else if (options.includes("number")){options = [1,2,3]}
       console.log(parameterName, options)
       let randomChoice = options[Math.floor(Math.random() * options.length)]
       setConlangParams(prevParams=>{return{...prevParams, [parameterName]:randomChoice}})
    })
  }

  const handleGetLexicon = (e) => {
    const data = {
      conlangParams: conlangParams
    }
    axios.post('http://localhost:8000/conlang/lexicon/', data).then(resp => {
      console.log(resp.data)
      setVocab(resp.data['lemmata'])
    }).catch(err => {console.log(err)})
  }

  //console.log(parameters)
  return(
    <Layout>
    <div className="container">
      <div className="topArea">
        <div className="titleArea">
          <h1 className="title">Conlang Creator</h1>
          <p className="subtitle">construct a language, just for fun</p>
        </div>
        <div className="topNav"></div>
      </div>
      <div className="parameterContainer">
        <h2>Language settings</h2>
        <Button  className='randomButton' onClick={randomParams}>Random settings</Button>
        <Button  className='clearButton' onClick={clearParams}>Clear settings</Button>
        
        {Object.keys(conlangParams).length === 0 ? <p>No params</p> : 
           <div className="parameterDiv">
           <div className="formDiv">
           <ParameterForm 
             handleChange={handleChange} 
             handleSubmit={handleSubmit} 
             parameters={parameters['parameters']}
             conlangParams={conlangParams}
           />
           </div>
           <div className="reportDiv">
              <h4>Conlang Parameters</h4>
              <ParameterReport conlangParams={conlangParams}/>
           </div>
          </div>
       }
      </div>
      <div className="phonologyContainer">
      </div>
      { vocab.length === 0 ? "" :
        <VocabTable vocab={vocab}/>
      }
    </div>  
   </Layout>
)
}

export default App;
