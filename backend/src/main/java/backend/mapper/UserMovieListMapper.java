package backend.mapper;

import backend.dto.response.MoviesResponse;
import backend.dto.response.UserMovieListResponse;
import backend.entity.UserMovieList;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = "spring", unmappedTargetPolicy = IGNORE)
public interface UserMovieListMapper {
    static UserMovieListResponse userMovieListToResponse(UserMovieList userMovieList) {
        return new UserMovieListResponse(
                userMovieList.getUser().getId(),
                userMovieList.getMovieId(),
                userMovieList.getType()
        );
    }

    static MoviesResponse userMovieListsToMoviesResponse(List<UserMovieList> userMovieLists) {
        ArrayList<Long> tmpList = new ArrayList<>();
        for(UserMovieList UserMovieList : userMovieLists) {
            tmpList.add(UserMovieList.getMovieId());
        }
        return new MoviesResponse(tmpList);
    }
}
