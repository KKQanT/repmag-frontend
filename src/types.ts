enum PageStatus {
    Loading = "loading",
    Auth = "auth",
    InputProfile = "inputProfile",
    Swipping = "swipping",
    MatchedSelection = "matchSelection",
    Chatroom = "chatroom"
}

enum GenderEnum {
    Man = "man",
    Woman = "woman"
}

interface PreferencesType {
    gender: GenderEnum | null,
    ageRange: { min: number | null, max: number | null } | null,
    universities: string[] | null,
    occupations: string[] | null
}

interface PrivateMessageArgs {
    message: string,
    fromSocketID: string,
    toUserID: string
}

interface OtherUsers {
    age: number,
    gender: GenderEnum | null,
    name: string,
    occupation: string,
    university: string,
    userID: string,
    _id: string
}

export {
    PageStatus,
    GenderEnum,
    type PreferencesType,
    type PrivateMessageArgs,
    type OtherUsers
};