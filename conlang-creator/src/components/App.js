import React, {useState, useEffect} from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {makeStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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
import Table from 'react-bootstrap/Table'

const useStyles = makeStyles(theme=> ({
  formControl: {
    margin: theme.spacing(1),
    minWidth:120,
  }}))


function VocabTable(props){
  const vocabRows = props.vocab.map(word => {
    return(
      <tr>
        <td>{word.meaning}</td>
        <td>{word.lemma}</td>
        <td>{word.pos}</td>
        <td>{word.category}</td>
      </tr>
    )
  })
  return(
    <div className="vocabTable">
      <h4>Vocab</h4>
      <Table>
        <thead>
          <tr>
            <th>Meaning</th>
            <th>Lemma</th>
            <th>Part of speech</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {vocabRows}
        </tbody>
      </Table>
    </div>
  )
}

function PhonemePicker(props){
}

function ParameterReport(props){
  let conlangParams = props.conlangParams
  const paramsList = Object.entries(props.conlangParams).map(([param, setting]) => {
          return(<li key={param}>{param}: {setting === true || setting === false ? setting.toString() : setting}</li>)
   })
  return(
    <ul className="paramsList">{paramsList}</ul>
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
      return(<Form.Group controlId={parameterName}>
               <Form.Label>{parameterDisplayName}</Form.Label>
               <Form.Control type="number" onChange={props.handleChange} value={conlangParams[parameterName]}/>
             </Form.Group>
      )
      }else if(parameterSettings.includes("bool")) {
         return(<Form.Group controlId={parameterName}>
                  <Form.Check 
                      type="checkbox" 
                      label={parameterDisplayName} 
                      onChange={props.handleChange} 
                      checked={(conlangParams[parameterName] === true)}/>
                </Form.Group>
         )
      } else {
         let settingButtons = parameterSettings.map(setting => {
           return(
             <Form.Check 
                  type="radio" 
                  label={setting} 
                  value={setting}
                  name={parameterName} 
                  onChange={props.handleChange} 
                  checked={(conlangParams[parameterName] === setting)}/>
           )
         })
         return(
           <Form.Group controlId={parameterName}>
             <Form.Label>{parameterDisplayName}</Form.Label>
             {settingButtons}
           </Form.Group>
         )}
    })
    return(
      <Form className="conlangParams" onSubmit={props.handleSubmit}>
        {paramsMenu}
        <Button type="submit">Update</Button>
      </Form>
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

  const handleChange = (e) => {
    const {id, value, type} = e.target
    if (type === "checkbox") {
      setConlangParams((prevParams) => {return {...prevParams,[id]:!prevParams[id]}})
    } else if (type === "radio") {
       setConlangParams((prevParams) => {return {...prevParams, [id]:value}})
    } else {
      setConlangParams((prevParams) => {return {...prevParams, [id]:value}})
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
        <Button className='randomButton' onClick={randomParams}>Random settings</Button>
        <Button onClick={clearParams}>Clear settings</Button>
        
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
)
}

export default App;
