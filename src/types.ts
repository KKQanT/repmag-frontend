enum PageStatus {
    Loading = "loading",
    Auth = "auth",
    InputProfile = "inputProfile",
    Swipping = "swipping"

}

enum GenderEnum {
    Man = "man",
    Woman = "woman",
}

interface PreferencesType {
    gender: GenderEnum | null,
    ageRange: {min: number | null, max: number|null} | null,
    universities: string[] | null,
    occupations: string[] | null
}

export { PageStatus, GenderEnum, type PreferencesType };