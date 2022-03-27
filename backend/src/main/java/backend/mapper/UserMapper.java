package backend.mapper;
import backend.dto.request.UserRequest;
import backend.dto.response.UserResponse;
import backend.entity.User;
import org.mapstruct.Mapper;

import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = "spring", unmappedTargetPolicy = IGNORE)
public interface UserMapper {

    static UserResponse userToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        return userResponse;
    }

    static User requestToUser(UserRequest userRequest, User user) {
        if (userRequest.getUsername() != null && !userRequest.getUsername().isEmpty()) {
            user.setUsername(userRequest.getUsername());
        }
        if (userRequest.getEmail() != null && !userRequest.getEmail().isEmpty()) {
            user.setEmail(userRequest.getEmail());
        }
        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(userRequest.getPassword());
        }
        return user;
    }
}