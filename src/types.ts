enum PageStatus {
    Loading = "loading",
    Auth = "auth",
    InputProfile = "inputProfile",
    Swipping = "swipping",
    MatchedList = "matchedList",
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
    toUserID: string,
    fromUserID: string
}

interface OtherUser {
    age: number,
    gender: GenderEnum | null,
    name: string,
    occupation: string,
    university: string,
    userID: string,
}

enum MatchingStatus {
    await = "await",
    matched="matched",
    pass="pass",
    unmatched="unmatched"
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
    type OtherUser,
    MatchingStatus,
    type Message
};