export interface ApiResponse<T> {
    response: T | null
    success: boolean
    statusCode: number
    message: string
}