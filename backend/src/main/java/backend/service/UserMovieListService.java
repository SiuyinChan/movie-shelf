package backend.service;

import backend.dto.request.UserMovieListRequest;
import backend.dto.response.MoviesResponse;
import backend.dto.response.UserMovieListResponse;

import javax.validation.Valid;

public interface UserMovieListService {
    UserMovieListResponse save(@Valid UserMovieListRequest userMovieListRequest);

    MoviesResponse getWishListByUserId(Long userId);

    MoviesResponse getWatchedListByUserId(Long userId);
}
