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
        <Dropdown.Item as="button">
          {setting}
        </Dropdown.Item>
      )})
    return (<DropdownButton title={parameterDisplayName}>{settingButtons}</DropdownButton>)
    })
    return(
      <div>
        {paramsMenu}
      </div>
    )
  }


function App(props){
  const [wordOrder, setWordOrder] = useState("")
  const [adpositions, setAdpositions] = useState(false)
  const [nounClasses, setNounClasses] = useState(false)
  const [verbTense, setVerbTense] = useState(false)
  const [verbPerson, setVerbPerson] = useState(false)
  const [copula, setCopula] = useState(false)
  const [nounCase, setNounCase] = useState(false)
  const [verbAspect, setVerbAspect] = useState(false)
  const [verbMood, setVerbMood] = useState(false)
  const [fusionLevel, setFusionLeve] = useState("")
  const [flexivityLevel, setFlexivityLevel] = useState("")
  const [exponenceLevel, setExponenceLevel] = useState("")

  console.log(parameters)
  return(
    <ParameterPicker wordOrder={wordOrder} fusionLevel={fusionLevel} flexivityLevel={flexivityLevel} exponenceLevel={exponenceLevel} parameters={parameters['parameters']}/>
  )

}

export default App;
