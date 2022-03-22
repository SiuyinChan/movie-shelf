package backend.service.impl;
import backend.dto.request.UserMovieListRequest;
import backend.dto.response.MoviesResponse;
import backend.dto.response.UserMovieListResponse;
import backend.entity.MovieListType;
import backend.entity.User;
import backend.entity.UserMovieList;
import backend.exception.UserMovieListAlreadyExistsException;
import backend.mapper.UserMovieListMapper;
import backend.repository.UserMovieListRepository;
import backend.service.UserMovieListService;
import backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMovieListServiceImpl implements UserMovieListService {
    private final UserMovieListRepository userMovieListRepository;
    private final UserService userService;

    public UserMovieListServiceImpl(UserMovieListRepository userMovieListRepository, UserService userService) {
        this.userMovieListRepository = userMovieListRepository;
        this.userService = userService;
    }

    @Override
    public UserMovieListResponse save(UserMovieListRequest userMovieListRequest) {
        Optional<UserMovieList> existingUserMovieList = userMovieListRepository.findByUserIdAndMovieIdAndType(userMovieListRequest.getUserId(), userMovieListRequest.getMovieId(), userMovieListRequest.getType());
        if (existingUserMovieList.isPresent()) {
            throw new UserMovieListAlreadyExistsException();
        }

        User user = userService.loadUserById(userMovieListRequest.getUserId());

        UserMovieList userMovieList = new UserMovieList();
        userMovieList.setUser(user);
        userMovieList.setMovieId(userMovieListRequest.getMovieId());
        userMovieList.setType(userMovieListRequest.getType());

        userMovieListRepository.save(userMovieList);

        return UserMovieListMapper.userMovieListToResponse(userMovieList);
    }

    @Override
    public MoviesResponse getWishListByUserId(Long userId) {
        List<UserMovieList> userMovieLists = userMovieListRepository.findUserMovieListsByUserIdAndType(userId, MovieListType.valueOf("WISH_LIST"));
        return UserMovieListMapper.userMovieListsToMoviesResponse(userMovieLists);
    }

    @Override
    public MoviesResponse getWatchedListByUserId(Long userId) {
        List<UserMovieList> userMovieLists = userMovieListRepository.findUserMovieListsByUserIdAndType(userId, MovieListType.valueOf("WATCHED_LIST"));
        return UserMovieListMapper.userMovieListsToMoviesResponse(userMovieLists);
    }
}
