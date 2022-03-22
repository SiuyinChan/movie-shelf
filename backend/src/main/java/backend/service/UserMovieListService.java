package backend.service;

import backend.dto.request.UserMovieListRequest;
import backend.dto.response.MoviesResponse;
import backend.dto.response.UserMovieListResponse;

public interface UserMovieListService {
    UserMovieListResponse save(UserMovieListRequest userMovieListRequest);

    MoviesResponse getWishListByUserId(Long userId);

    MoviesResponse getWatchedListByUserId(Long userId);
}
