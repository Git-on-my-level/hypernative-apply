/**
 * API Response Unwrapper Utility
 *
 * Handles API responses that may be wrapped in {"data": [...]} format.
 * Provides helper functions to safely unwrap responses while maintaining
 * backward compatibility with both wrapped and unwrapped formats.
 */
/**
 * Unwrap a single API response object
 *
 * @param response - The axios response object with a data property
 * @returns The unwrapped data
 */
export declare function unwrapApiResponse<T>(response: {
    data: any;
}): T;
/**
 * Unwrap an API response that should contain a list/array
 *
 * @param response - The axios response object with a data property
 * @returns An array, or empty array if the response is null/undefined
 */
export declare function unwrapApiListResponse<T>(response: {
    data: any;
}): T[];
//# sourceMappingURL=api-response.d.ts.map