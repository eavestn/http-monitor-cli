// The below property interface is determined by a third-party provider.
// It does not adhere to the larger code-base's casing convention.
export default interface IRawHttpTrafficRecord {
	remotehost: string;
	authuser: string;
	rfc931: string;
	date: string;
	request: string;
	status: string;
	bytes: string;
}
