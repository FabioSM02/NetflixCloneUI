import React from 'react';

import './FeaturedMovie.css';

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);

    let genres = [];
    for(let i in item.genres){
        genres.push( item.genres[i].name )
    }

    let description = item.overview;
    if(description.length > 200){
        description = description.substring(0, 200)+'...';
    }

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured-vertical">
                <div className="featured-horizontal">
                    <div className="featured-name">
                        {item.original_name}
                    </div>
                    <div className="featured-info">
                        <div className="featured-points">
                            {item.vote_average} pontos
                        </div>
                        <div className="featured-year">
                            {firstDate.getFullYear()}
                        </div>
                        <div className="featured-seasons">
                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className="featured-description">
                        {description}
                    </div>
                    <div className="featured-buttons">
                        <a href={`/watch/${item.id}`} className="featured-watch-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
                                <path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/>
                            </svg>
                            Assistir
                        </a>
                        <a href={`/list/add/${item.id}`} className="featured-add-list-button">
                            Adicionar à minha lista
                        </a>
                    </div>
                    <div className="featured-genres">
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}