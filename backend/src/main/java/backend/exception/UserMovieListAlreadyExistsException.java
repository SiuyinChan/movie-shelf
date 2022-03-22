package backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserMovieListAlreadyExistsException extends RuntimeException {
    public UserMovieListAlreadyExistsException() {
        super("UserMovieList already exists");
    }
}
