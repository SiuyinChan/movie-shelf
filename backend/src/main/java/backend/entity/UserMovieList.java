package backend.entity;

import javax.persistence.*;

@Entity
public class UserMovieList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(name = "MOVIE_ID", nullable = false)
    private Long movieId;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    private MovieListType type;

    public void setUser(User user) {
        this.user = user;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setType(MovieListType type) {
        this.type = type;
    }

    public MovieListType getType() {
        return type;
    }

    public User getUser() {
        return user;
    }
}
