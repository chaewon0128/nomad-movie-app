import { useMatch, useNavigate } from 'react-router-dom';
import Overlay from '../overlay/Overlay';
import Modal from '../modal/Modal';
import { IMovie, makeImagePath } from '../../api';
import { Wrapper, Box, MovieTitle, itemVariant, boxVariant, List, movieVariant, Loader } from './styled';
import useGetMovies from '../../hooks/useGetMovies';
import { RotatingLines } from 'react-loader-spinner';


interface IMovieList {
    apiFn: () => Promise<any>,
    type: string,
    QUERY_KEY: string

};


export default function MovieList({ type, apiFn, QUERY_KEY }: IMovieList) {
    const { data, isLoading } = useGetMovies(QUERY_KEY, apiFn);
    const navigate = useNavigate();
    const movieMatch = useMatch(`${type}/movies/:id`);
    const onBoxClick = (id: number, title?: string) => {
        navigate(`movies/${id}`, {
            state: {
                movieTitle: title,
                movieId: id
            }
        });
    };
    return (
        <>
            {isLoading ? (
                <Loader>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="30"
                        visible={true}
                    />
                </Loader>
            ) : (
                <List variants={movieVariant} initial="start" animate="exit">

                    {data?.results.map((movie: IMovie) => (
                        <Wrapper variants={itemVariant} key={movie.id}>
                            <Box
                                onClick={() => onBoxClick(movie.id, movie.title)}
                                variants={boxVariant}
                                whileHover="hover"
                                transition={{ delay: 0.2 }}
                                bgphoto={makeImagePath(movie.poster_path)}
                            />
                            <MovieTitle>{movie.title}</MovieTitle>
                        </Wrapper>
                    ))}
                </List>
            )}
            {movieMatch && (
                <>
                    <Overlay />
                    <Modal />
                </>
            )}
        </>
    );
}
