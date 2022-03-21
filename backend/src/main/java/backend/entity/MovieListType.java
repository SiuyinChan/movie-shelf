package backend.entity;

public enum MovieListType {
    WATCHED_LIST("WATCHED_LIST"),
    WISH_LIST("WISH_LIST");

    public final String label;

    MovieListType(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return label;
    }
}
