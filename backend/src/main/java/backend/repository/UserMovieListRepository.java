package backend.repository;

import backend.dto.response.MoviesResponse;
import backend.entity.MovieListType;
import backend.entity.UserMovieList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMovieListRepository extends JpaRepository<UserMovieList, String> {
    List<UserMovieList> findAllByUserId(Long id);

    List<UserMovieList> findUserMovieListsByUserIdAndType(Long userId, MovieListType type);
}
