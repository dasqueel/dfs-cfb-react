import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {
  state = {
    "qbs": [],
    "rbs": [],
    "wrs": []
  }

  componentDidMount() {
    axios.get(`https://dfs-cfb.herokuapp.com/`)
      .then(res => {
        console.log({res})
        // const posts = res.data.data.children.map(obj => obj.data)
        const { qbs, rbs, wrs } = res.data
        console.log({qbs})
        console.log({rbs})
        console.log({wrs})
        // this.setState({ qbs, rbs, wrs })
        this.setState({ qbs })
        this.setState({ rbs })
        this.setState({ wrs })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { qbs, rbs, wrs } = this.state

    return(
      qbs.map(qb => {
        // console.log({qb})
        return (
        <div>
          <p key={qb.id}>{qb.name}</p><br></br>
        </div>
        )
      })
    )
    // return(<p>haaay</p>)
  }
}

export default App
