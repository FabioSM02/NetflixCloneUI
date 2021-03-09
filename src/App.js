import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

import './App.css';

import Header from './components/Header/Header';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import MovieRow from './components/MovieRow/MovieRow';
import Modal from './components/Modal/Modal';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista de filmes
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // Pegando o Featured
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 40){
                setBlackHeader(true);
            } else{
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);
    
    return (
        <div className="page">

            <Header black={blackHeader} />

            { featuredData && 
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração"></span> por Fabio Casa <br/>
                Direitos de imagem para Netflix <br/>
                Dados retirados do site themoviedb.org
            </footer>


            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Loading"/>
                </div>
            }
        </div>
    );
}