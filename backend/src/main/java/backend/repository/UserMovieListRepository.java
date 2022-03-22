package backend.repository;
import backend.entity.MovieListType;
import backend.entity.UserMovieList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserMovieListRepository extends JpaRepository<UserMovieList, String> {
    List<UserMovieList> findAllByUserId(Long id);

    List<UserMovieList> findUserMovieListsByUserIdAndType(Long userId, MovieListType type);

    Optional<UserMovieList> findByUserIdAndMovieIdAndType(Long userId, Long movieId, MovieListType type);
}
