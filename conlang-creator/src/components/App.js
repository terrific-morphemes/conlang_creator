import React, {useState, useEffect} from 'react';
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
      <div className="container">
        {paramsMenu}
      </div>
    )
  }


function App(props){
  const [conlangParams, setConlangParams] = useState({})
  
  const handleUpdateParams = (e) => {
    console.log('old params', conlangParams)
    let {name, value} = e.target
    let oldParams = conlangParams
    oldParams[name] = value
    setConlangParams(oldParams)
    console.log('new params', conlangParams)
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
      <ParameterPicker handleUpdateParams={handleUpdateParams} parameters={parameters['parameters']}/>
    </div>  
)
}

export default App;
