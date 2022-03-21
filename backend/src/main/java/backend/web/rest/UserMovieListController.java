package backend.web.rest;

import backend.dto.request.UserMovieListRequest;
import backend.dto.response.MoviesResponse;
import backend.dto.response.UserMovieListResponse;
import backend.service.UserMovieListService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/movie-lists")
public class UserMovieListController {
    private final UserMovieListService userMovieListService;

    public UserMovieListController(UserMovieListService userMovieListService) {
        this.userMovieListService = userMovieListService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    UserMovieListResponse createUserMovieList(@Valid @RequestBody UserMovieListRequest userMovieListRequest) {
        System.out.print("zizi");
        return userMovieListService.save(userMovieListRequest);
    }

    @GetMapping("/wish-list/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    MoviesResponse getWishListByUserId(@Valid @PathVariable("userId") Long userId) {
        return userMovieListService.getWishListByUserId(userId);
    }

    @GetMapping("/watched-list/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    MoviesResponse getWatchedListByUserId(@Valid @PathVariable("userId") Long userId) {
        return userMovieListService.getWatchedListByUserId(userId);
    }
}
