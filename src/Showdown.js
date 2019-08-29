import React from "react"
import axios from "axios"
import "./App.css"

class Showdown extends React.Component {

  state = {
    captains: [],
    utilities: [],
    captainCount: 0,
    utilityCount: 0,
    totalEnteries: 0,
    fileName: "",
    downloadUrl: null
  }

  componentDidMount() {
    // const csvFile = window.location.pathname.replace("/", "")
    const csvFile = this.props.match.params.csvFile
    // const { csvFile } = this.props.match.params

    console.log({csvFile})

    axios
      // .get(`https://dfs-cfb.herokuapp.com/showdown/${csvFile}`)
      .get(`http://127.0.0.1:5000/showdown/${csvFile}`)
      .then(res => {
        const { captains, utilities } = res.data

        console.log(res.data)

        this.setState({ captains, utilities })
      })
      .catch(err => console.log(err))
  }

  updateNumberEnteries(event) {
    this.setState({ totalEnteries: parseInt(event.target.value) })
  }

  updateFileName(event) {
    this.setState({ fileName: event.target.value })
  }

  updatePosition = (pos) => (event) => {
    const { totalEnteries } = this.state

    const posInputs = Array.prototype.slice.call(document.getElementsByName(pos))

    const count = posInputs.reduce((acc, cur) => {
      if (cur.value === "") { return acc + 0 }
      else { return acc + parseInt(cur.value) }
    }, 0)

    const posKey = `${pos}Count`
    this.setState({ [posKey]: count })
  }

  // createCsv = () => {
  //   const { qbs, rbs, wrs, totalEnteries, fileName } = this.state

  //   // add shares of each player
  //   // { name: 'Sean Taylor', id: 2892393, shares: 20 }
  //   let finalQbs = []
  //   qbs.forEach(qb => {
  //     const el = document.getElementById(qb.id)
  //     const val = el.value
  //     if (val !== "") {
  //       finalQbs.push({ id: qb.id, name: qb.name, shares: parseInt(val) })
  //     }
  //   })

  //   let finalRbs = []
  //   rbs.forEach(rb => {
  //     const el = document.getElementById(rb.id)
  //     const val = el.value
  //     if (val !== "") {
  //       finalRbs.push({ id: rb.id, name: rb.name, shares: parseInt(val) })
  //     }
  //   })

  //   let finalWrs = []
  //   wrs.forEach(wr => {
  //     const el = document.getElementById(wr.id)
  //     const val = el.value
  //     if (val !== "") {
  //       finalWrs.push({ id: wr.id, name: wr.name, shares: parseInt(val) })
  //     }
  //   })

  //   const payload = JSON.stringify({
  //     finalQbs,
  //     finalRbs,
  //     finalWrs,
  //     totalEnteries,
  //     fileName
  //   })

  //   axios.post(
  //     // 'http://localhost:5000/out',
  //     'https://dfs-cfb.herokuapp.com/out',
  //     payload,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     }
  //   )
  //     .then(resp => {
  //       console.log({ resp })
  //       const downloadUrl = resp.data
  //       this.setState({ downloadUrl })
  //     })
  //     .catch(err => {
  //       console.log({ err })
  //       alert('nope sorry')
  //     })
  // }

  render() {
    const {
      captains,
      utilities,
      captainCount,
      utilityCount,
      totalEnteries,
      downloadUrl } = this.state

    return (
      <div className="app">
        <div className="headers">
          number of enteries:
          <input
            type="text"
            value={this.state.title}
            onChange={this.updateNumberEnteries.bind(this)}
          />
          <p>captains left: {totalEnteries - captainCount}</p>
          <p>utilities left: {totalEnteries - utilityCount}</p>
          <input type="text" value={this.state.fileName} onChange={this.updateFileName.bind(this)} />
          <button onClick={this.createCsv}>create csv</button>
          {downloadUrl && <a href={downloadUrl} rel="noopener noreferrer" target="_blank">download here</a>}
        </div>
        <div className="players">
          <div className="captains">
            {captains.map(captain => {
              return (
                <div className="player">
                  <input
                    type="text"
                    name="captains"
                    onChange={this.updatePosition("captains")}
                    id={captain.id}
                  />
                  <p key={captain.id}>
                    {captain.team} {captain.name} {captain.sal} {captain.date}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="utilitys">
            {utilities.map(utility => {
              return (
                <div className="player">
                  <input
                    type="text"
                    name="utilitys"
                    onChange={this.updatePosition("utilitys")}
                    id={utility.id}
                  />
                  <p key={utility.id}>
                    {utility.team} {utility.name} {utility.sal} {utility.date}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Showdown
