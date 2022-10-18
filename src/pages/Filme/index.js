import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "7f0b8ce42d97e76a4bad04601a4497fb",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true });
                    return;
                })
        }

        loadFilmes();

        return () => {
            
        }

    }, [navigate, id])

    function salvarFilme(){

        const minhaLista = localStorage.getItem("@reactflix")

        let filmesSalvos =JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if (hasFilme){
            alert("Esse filme já faz parte da sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@reactflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h2>Carregando Detalhes ...</h2>
            </div>
        )

    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button> <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a></button>

            </div>

        </div>
    )
}

export default Filme;