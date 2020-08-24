/**
 * Users are identified by case-sensitive ids, and live under /v0/user/.
 * Only users that have public activity (comments or story submissions) on the site are available through the API.
 */
export interface User {

    /**
     * The user's unique username. Case-sensitive. Required.
     */
    id: string;

    /**
     * Delay in minutes between a comment's creation and its visibility to other users.
     */
    delay?: number;

    /**
     * Creation date of the user, in Unix Time.
     */
    created: number;

    /**
     * The user's karma.
     */
    karma: number;

    /**
     * The user's optional self-description. HTML.
     */
    about?: string;

    /**
     * List of the user's stories, polls and comments.
     */
    submitted?: readonly number[]
}
