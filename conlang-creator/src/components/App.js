import React, {useState, useEffect} from 'react';
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
import logo from '../resources/logo.svg';
import parameters from '../resources/parameters.json'
import '../styles/App.css';

const useStyles = makeStyles(theme=> ({
  formControl: {
    margin: theme.spacing(1),
    minWidth:120,
  }}))

function PhonemePicker(props){
}

function ParameterReport(props){
  let conlangParams = props.conlangParams
  console.log(conlangParams)
  const paramsList = Object.entries(props.conlangParams).map(([param, setting]) => {
          console.log(param, setting)
          return(<li key={param}>{param}: {setting}</li>)
   })
  return(
    <ul className="paramsList">{paramsList}</ul>
  )
}

function ParameterPicker(props){
  const classes = useStyles()
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
    return (<DropdownButton key={parameterDisplayName} className="parameterSetting" title={parameterDisplayName}>{settingButtons}</DropdownButton>)
    })
    return(
      <ButtonToolbar className="conlangParams">
        {paramsMenu}
      </ButtonToolbar>
    )
  }


function App(props){
  const [conlangParams, setConlangParams] = useState({})
  

  const clearParams = () => {
    let emptyParams = {}
    parameters['parameters'].map(parameter => {
      setConlangParams(prevParams => {return{
         ...prevParams,
         [parameter['attribute']]: ''
       }
    })})
  }

  const handleUpdateParams = (e) => {
    let {name, value} = e.target
    setConlangParams(prevParams => {return {
         ...prevParams,
         [name]:value}})
    console.log(conlangParams)
  }

  const randomParams = (e) => {
    console.log('setting random params')
    parameters['parameters'].map((parameter) => {
       let parameterName = parameter['attribute']
       let options = parameter['setting']
       let randomChoice = options[Math.floor(Math.random() * options.length)]
       setConlangParams(prevParams=>{return{...prevParams, [parameterName]:randomChoice}})
    })
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
        <ParameterPicker handleUpdateParams={handleUpdateParams} parameters={parameters['parameters']}/>
      </div>
      <div className="phonologyContainer">
      </div>
        {Object.keys(conlangParams).length === 0 ? <p>No params</p> : <div>params<ParameterReport conlangParams={conlangParams}/></div>}
    </div>  
)
}

export default App;
