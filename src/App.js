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
    totalEnteries: 0
  }

  componentDidMount() {
    axios
      // .get(`https://dfs-cfb.herokuapp.com/`)
      .get(`http://127.0.0.1:5000/`)
      .then(res => {
        const { qbs, rbs, wrs } = res.data

        this.setState({ qbs, rbs, wrs })
      })
      .catch(err => console.log(err))
  }

  updateNumberEnteries(event) {
    const { totalEnteries, qbsCount, rbsCount, wrsCount, flexLeft, superFlexLeft } = this.state
    this.setState({ totalEnteries: event.target.value })
  }

  updatePosition = (pos) => (event) => {
    // update the total for that position

    // update the flex reasonsing
    const posInputs = Array.prototype.slice.call(document.getElementsByName(pos))

    const count = posInputs.reduce((acc, cur) => {
      if (cur.value === "") { return acc + 0 }
      else { return acc + parseInt(cur.value) }
    }, 0)

    const posKey = `${pos}Count`
    this.setState({ [posKey]: count})
  }

  render() {
    const { qbs,
            rbs,
            wrs,
            qbsCount,
            rbsCount,
            wrsCount,
            flexCount,
            superFlexCount,
            totalEnteries } = this.state

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
          <p>rbs left: {2 *totalEnteries - rbsCount}</p>
          <p>wrs left: {3 * totalEnteries - wrsCount}</p>
          <p>flex left: {totalEnteries - flexCount}</p>
          <p>super flex left: {totalEnteries - superFlexCount}</p>
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
                <p key={rb.id}>
                  {rb.team} {rb.name} {rb.sal} {rb.date}
                </p>
              )
            })}
          </div>
          <div className="wrs">
            {wrs.map(wr => {
              return (
                <p key={wr.id}>
                  {wr.team} {wr.name} {wr.sal} {wr.date}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App
