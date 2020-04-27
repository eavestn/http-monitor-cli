export default interface IHttpRequest {
	Url: string;
	Protocol: string;
	RequestType: "GET" | "POST" | "PUT" | "DELETE"; // could be extended
}
