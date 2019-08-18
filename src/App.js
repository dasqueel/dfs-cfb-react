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
        const { qbs, rbs, wrs } = res.data

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
        return (
        <div>
          <p key={qb.id}>{qb.name}</p><br></br>
        </div>
        )
      })
    )
  }
}

export default App
