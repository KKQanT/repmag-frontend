enum PageStatus {
    Loading = "loading",
    Auth = "auth",
    InputProfile = "inputProfile",
    Swipping = "swipping",
    MatchedList = "matchedList",
    Chatroom = "chatroom",
    ProfileEdit = "profileEdit"
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

interface Location {
    city: string | null,
    country: string | null
}

interface PrivateMessageArgs {
    message: string,
    toUserID: string,
    fromUserID: string
}

interface UserInfo {
    userID: string,
    name: string,
    gender: GenderEnum|null,
    age: number|null,
    university: string|null,
    occupation: string|null,
    userImages: string[],
    bio: string|null,
    location: {
        city: string|null,
        country: string|null
    },
    interestedIn: string[]
}

enum MatchingStatus {
    await = "await",
    matched = "matched",
    pass = "pass",
    unmatched = "unmatched"
}

interface Message {
    message: string,
    time: string,
    senderID: string,
    isRead: boolean
}

export {
    PageStatus,
    GenderEnum,
    type PreferencesType,
    type PrivateMessageArgs,
    type UserInfo,
    MatchingStatus,
    type Message,
    type Location
};