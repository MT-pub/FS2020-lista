import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { Grid } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function App() {
  const [leftList, setLeftList] = useState(["MattiTeppoSeppo", "Teppo", "Seppo"])
  const [rightList, setRightList] = useState(["Hupu", "Tupu", "Lupu"])
  const [leftSelect, setLeftSelect] = useState(-1)
  const [rightSelect, setRightSelect] = useState(-1)


  const moveRight = () => {
    if (leftSelect !== -1) {
      setRightList(rightList.concat(leftList[leftSelect]))
      let tempArr = leftList
      tempArr.splice(leftSelect, 1)
      setLeftList(tempArr)
      setLeftSelect(-1)
    }
  }

  const moveLeft = () => {
    if (rightSelect !== -1) {
      setLeftList(leftList.concat(rightList[rightSelect]))
      let tempArr = rightList
      tempArr.splice(rightSelect, 1)
      setRightList(tempArr)
      setRightSelect(-1)
    }
  }

  const makeList = (side) => {
    if (side === 'left') {
      if (leftList.length !== 0) {
        return (
          <List component="nav" key="leftList">
            {leftList.map((item, index) =>
              <ListItem
                button
                selected={leftSelect === index}
                onClick={() => { setLeftSelect(index) }}
              >
                <ListItemText primary={item} />
              </ListItem>)}
          </List>
        )
      } else {
        return (<Grid item xs={5}>This list has no items.</Grid>)
      }
    } else if (side === 'right') {
      if (rightList.length !== 0) {
        return (
          <List component="nav" key="rightList">
            {rightList.map((item, index) =>
              <ListItem
                button
                selected={rightSelect === index}
                onClick={() => { setRightSelect(index) }}
              >
                <ListItemText primary={item} />
              </ListItem>)}
          </List>
        )
      } else {
        return (<Grid item xs={5}>This list has no items.</Grid>)
      }
    }
  }

  return (
    <div className="App">
      <Grid container direction="column" key="leftCol">
        <Grid container direction="row">
          <Grid item xs={1}><i className="material-icons oma" onClick={moveRight}>arrow_drop_down</i></Grid>
          <Grid item xs={1}><i className="material-icons oma" onClick={moveLeft}>arrow_drop_up</i></Grid>
        </Grid>
        {makeList('left')}
      </Grid>
      {/*{leftList.map((item, index) => <Grid item key={index}><button onClick={() => { setLeftSelect(index) }}>{item}</button></Grid>)} */}
      <Grid container item direction="column" xs={1}>
        <Grid item xs={1}><i className="material-icons oma" onClick={moveRight}>arrow_forward</i></Grid>
        <Grid item xs={1}><i className="material-icons oma" onClick={moveLeft}>arrow_back</i></Grid>
      </Grid>
      <Grid container direction="column" key="rightCol">
        {makeList('right')}
      </Grid>
    </div>
  );
}

export default App;
