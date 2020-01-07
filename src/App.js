import React from 'react';
import './App.css';

/*  {this.state.songs.length > 0 &&
this.state.songs.map(function(song, i){
  return  <li key={song.id}>{song.name}
  <audio  src={"https://assets.breatheco.de/apis/sound/" + song.url}>
  </audio>
  {console.log(song.url)}
  </li>
}
)}

*/
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      estado: 1,
      songs: [],
      mostrar: "",
      esconder: "d-none",
    }
    this.player = null;
  }

  getSongs(url) {
    fetch(url)
      .then((resp) => {   //saber que esta devolviendo el server
        console.log(resp);
        return resp.json()
      })
      .then((data) => {  //hora de manipular el state de songs.
        console.log(data);
        this.setState({
          songs: data
        })
      })
      .catch((error) => {  //este es error en mi fetch, no del servidor.
        console.log(error);
      })
  }


  //componentWillMount(){  //no ocupar x razones de seguridad.
  //console.log("antes de montar el componente");
  //}
  componentDidMount() {
    console.log("despues de renderizar el componente");
    this.getSongs('https://assets.breatheco.de/apis/sound/songs');

    console.log(this.player);

  }
  componentDidUpdate() {
    console.log("despues de una actualizacion");
  }
  componentWillUnmount() {
    console.log("antes de destruir el componente")
  }

  setPlayer(e, i){
    e.preventDefault()
    this.player = document.querySelectorAll("audio")[i];
    if(this.state.estado === 1){
      this.setState({estado: 2})
      this.player.play()
    }else if(this.state.estado === 2){
      this.setState({estado: 1})
      this.player.pause()
    }
  }


    play(e){
      e.preventDefault();
      this.state.estado === 1 ? this.setState({estado: 2}) : this.setState({estado: 1})
      this.player.play()
    }  

    pause(e){
      e.preventDefault();
      this.state.estado === 1 ? this.setState({estado: 2}) : this.setState({estado: 1})
      this.player.pause()
    }  

  render() {
    return (
      <>
        <div className="container" id="contenedorM">
          <div className="col">
            <div className="list-group" id="lista-musica">
              <ol>
                {this.state.songs.length > 0 &&
                  this.state.songs.map( (song, i) => {
                    return <li className="list-group-item" onClick={(e) => this.setPlayer(e, i)} key={i}>{song.id}. {song.name}
                      <audio    ref={(t) => this.player=t} src={"https://assets.breatheco.de/apis/sound/" + song.url} />
                    </li>
                  }
                  )}
              </ol>
            </div>
            <div className="col" id="botonesmusica">
              <a href="/" id="back" className="list-group-item list-group-item-action"><i className="fas fa-backward"></i></a>
              <a href="/" id="play" className={`list-group-item list-group-item-action ${this.state.estado === 1 ? this.state.mostrar : this.state.esconder}`} onClick={(e) => this.play(e)}><i className="fas fa-play"></i></a>
              <a href="/" id="pause" className={`list-group-item list-group-item-action ${this.state.estado === 2 ? this.state.mostrar : this.state.esconder}`} onClick={(e) => this.pause(e)}><i className="fas fa-pause"></i></a>
              <a href="/" id="next" className="list-group-item list-group-item-action"><i className="fas fa-forward"></i></a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;
