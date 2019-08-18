import React from "react"
import axios from "axios"
import "./App.css"

class App extends React.Component {
  state = {
    qbs: [],
    rbs: [],
    wrs: []
  }

  componentDidMount() {
    axios
      .get(`https://dfs-cfb.herokuapp.com/`)
      .then(res => {
        const { qbs, rbs, wrs } = res.data

        this.setState({ qbs, rbs, wrs })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { qbs, rbs, wrs } = this.state

    return (
      <div class="app">
        <div class="headers">headers here</div>
        <div class="players">
          <div class="qbs">
            {qbs.map(qb => {
              return (
                <p key={qb.id}>
                  {qb.team} {qb.name} {qb.sal} {qb.date}
                </p>
              )
            })}
          </div>
          <div class="rbs">
            {rbs.map(rb => {
              return (
                <p key={rb.id}>
                  {rb.team} {rb.name} {rb.sal} {rb.date}
                </p>
              )
            })}
          </div>
          <div class="wrs">
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

    // return qbs.map(qb => {
    //   return (
    //     <div class="players">
    //       <div class="qbs">
    //         <p key={qb.id}>{qb.name}</p>
    //         <br />
    //       </div>
    //       <div class="rbs">
    //         <p key={rb.id}>{rb.name}</p>
    //         <br />
    //       </div>
    //       <div class="wrs">
    //         <p key={wr.id}>{wr.name}</p>
    //         <br />
    //       </div>
    //     </div>
    //   )
    // })
  }
}

export default App
