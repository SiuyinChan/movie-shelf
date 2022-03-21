package backend.dto.request;

import backend.entity.MovieListType;

public class UserMovieListRequest {
    private Long userId;

    private Long movieId;

    private MovieListType type;

    public UserMovieListRequest(Long userId, Long movieId, MovieListType type) {
        this.userId = userId;
        this.movieId = movieId;
        this.type = type;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return this.movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public MovieListType getType() {
        return this.type;
    }

    public void setType(MovieListType type) {
        this.type = type;
    }
}
