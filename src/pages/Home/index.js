import { useEffect, useState } from 'react';
import api from '../../services/api';
////https://api.themoviedb.org/3/movie/550?api_key=7f0b8ce42d97e76a4bad04601a4497fb&language=pt-BR
function Home() {

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: "7f0b8ce42d97e76a4bad04601a4497fb",
                    language: "pt-BR",
                    page: 1,
                }
            })
        }

        loadFilmes();

    }, [])

    return (
        <div>
            <h1>Bem vindo a Home</h1>
        </div>
    )
}

export default Home;