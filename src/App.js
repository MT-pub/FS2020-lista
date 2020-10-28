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

  const sortList = (list, direction = "ascend") => {
    var tempArr
    if (list === "left") {
      tempArr = [...leftList]
    } else if (list === "right") {
      tempArr = [...rightList]
    } else {
      return
    }

    tempArr.sort()

    if (list === "left") {
      if (direction === "descend") {
        tempArr.reverse()
        setLeftList(tempArr)
      } else if (direction === "ascend") {
        setLeftList(tempArr)
      } else {
        return
      }
    } else if (list === "right") {
      if (direction === "descend") {
        tempArr.reverse()
        setRightList(tempArr)
      } else if (direction === "ascend") {
        setRightList(tempArr)
      } else {
        return
      }
    }

    return
  }

  return (
    <div className="App">
      <Grid container>
        <Grid container item direction="column" key="leftCol" xs={5} md={2}>
          <Grid container direction="row">
            <Grid item xs={1}><i className="material-icons" onClick={() => sortList("left")}>arrow_drop_up</i></Grid>
            <Grid item xs={1}><i className="material-icons" onClick={() => sortList("left", "descend")}>arrow_drop_down</i></Grid>
          </Grid>
          {makeList('left')}
        </Grid>
        {/*{leftList.map((item, index) => <Grid item key={index}><button onClick={() => { setLeftSelect(index) }}>{item}</button></Grid>)} */}
        <Grid container item direction="column" xs={2} md={1}>
          <Grid item></Grid>
          <Grid item xs={1}><i className="material-icons" onClick={moveRight}>arrow_forward</i></Grid>
          <Grid item xs={1}><i className="material-icons" onClick={moveLeft}>arrow_back</i></Grid>
        </Grid>
        <Grid container item direction="column" key="rightCol" xs={5} md={2}>
          <Grid container direction="row">
            <Grid item xs={1}><i className="material-icons" onClick={() => sortList("right")}>arrow_drop_up</i></Grid>
            <Grid item xs={1}><i className="material-icons" onClick={() => sortList("right", "descend")}>arrow_drop_down</i></Grid>
          </Grid>
          {makeList('right')}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
