import React from "react"
import axios from "axios"
import "./App.css"

class App extends React.Component {

  state = {
    qbs: [],
    rbs: [],
    wrs: [],
    qbsCount: 0,
    rbsCount: 0,
    wrsCount: 0,
    flexCount: 0,
    superFlexCount: 0,
    totalEnteries: 0,
    fileName: "",
    downloadUrl: null
  }

  componentDidMount() {
    const csvFile = window.location.pathname.replace("/","")

    axios
      .get(`https://dfs-cfb.herokuapp.com/${csvFile}`)
      // .get(`http://127.0.0.1:5000/${csvFile}`)
      .then(res => {
        const { qbs, rbs, wrs } = res.data

        this.setState({ qbs, rbs, wrs })
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
    this.setState({ [posKey]: count})


    if (pos === 'qbs') {
      if (count > totalEnteries) {
        this.setState({ superFlexCount: - (totalEnteries - count) })
      }
      else {
        this.setState({superFlexCount: 0})
      }
    }

    // if (pos === 'rbs') {

    // }
  }

  createCsv = () => {
    const { qbs, rbs, wrs, totalEnteries, fileName } = this.state

    // add shares of each player
    // { name: 'Sean Taylor', id: 2892393, shares: 20 }
    let finalQbs = []
    qbs.forEach(qb => {
      const el = document.getElementById(qb.id)
      const val = el.value
      if (val !== "") {
        finalQbs.push({ id: qb.id, name: qb.name, shares: parseInt(val)})
      }
    })

    let finalRbs = []
    rbs.forEach(rb => {
      const el = document.getElementById(rb.id)
      const val = el.value
      if (val !== "") {
        finalRbs.push({ id: rb.id, name: rb.name, shares: parseInt(val)})
      }
    })

    let finalWrs = []
    wrs.forEach(wr => {
      const el = document.getElementById(wr.id)
      const val = el.value
      if (val !== "") {
        finalWrs.push({ id: wr.id, name: wr.name, shares: parseInt(val)})
      }
    })

    const payload = JSON.stringify({
      finalQbs,
      finalRbs,
      finalWrs,
      totalEnteries,
      fileName
    })

    axios.post(
      // 'http://localhost:5000/out',
      'https://dfs-cfb.herokuapp.com/out',
      payload,
      { headers: {
        'Content-Type': 'application/json',
      }
    }
    )
    .then(resp => {
      console.log({resp})
      const downloadUrl = resp.data
      this.setState({downloadUrl})
    })
    .catch(err => {
      console.log({err})
      alert('nope sorry')
    })
  }

  render() {
    const {
            qbs,
            rbs,
            wrs,
            qbsCount,
            rbsCount,
            wrsCount,
            flexCount,
            superFlexCount,
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
          <p>qbs left: {totalEnteries - qbsCount}</p>
          <p>rbs left: {2 * totalEnteries - rbsCount}</p>
          <p>wrs left: {3 * totalEnteries - wrsCount}</p>
          <p>flex left: {totalEnteries - flexCount}</p>
          <p>super flex left: {totalEnteries - superFlexCount}</p>
          <input type="text" value={this.state.fileName} onChange={this.updateFileName.bind(this)} />
          <button onClick={this.createCsv}>create csv</button>
          {downloadUrl && <a href={downloadUrl} rel="noopener noreferrer" target="_blank">download here</a>}
        </div>
        <div className="players">
          <div className="qbs">
            {qbs.map(qb => {
              return (
                <div className="player">
                <input
                  type="text"
                  name="qbs"
                  onChange={this.updatePosition("qbs")}
                  id={qb.id}
                />
                <p key={qb.id}>
                  {qb.team} {qb.name} {qb.sal} {qb.date}
                </p>
                </div>
              )
            })}
          </div>
          <div className="rbs">
            {rbs.map(rb => {
              return (
                <div className="player">
                <input
                  type="text"
                  name="rbs"
                  onChange={this.updatePosition("rbs")}
                  id={rb.id}
                />
                <p key={rb.id}>
                  {rb.team} {rb.name} {rb.sal} {rb.date}
                </p>
                </div>
              )
            })}
          </div>
          <div className="wrs">
            {wrs.map(wr => {
              return (
                <div className="player">
                <input
                  type="text"
                  name="wrs"
                  onChange={this.updatePosition("wrs")}
                  id={wr.id}
                />
                <p key={wr.id}>
                  {wr.team} {wr.name} {wr.sal} {wr.date}
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

export default App
