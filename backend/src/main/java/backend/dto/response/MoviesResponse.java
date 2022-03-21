package backend.dto.response;

import java.util.List;

public class MoviesResponse {
    private List<Long> movies;

    public MoviesResponse(List<Long> movies) {
        this.movies = movies;
    }

    public List<Long> getMovies() {
        return movies;
    }

    public void setMovies(List<Long> movies) {
        this.movies = movies;
    }
}
