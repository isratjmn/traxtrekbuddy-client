export interface ITrip {
	id: string;
	destination: string;
	description: string;
	startDate: string;
	endDate: string;
	travelType: string;
	photos: string;
	itinerary: string;
	location: string;
}

export interface IUsers {
	id: string;
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role?: "user" | "admin";
	userProfile?: {
		bio?: string;
		profileImage?: string;
		age?: number;
	};
}




enum Role {
	Admin = "admin",
	User = "user",
}

enum UserActive {
	Activate = "ACTIVE",
	Deactivate = "DEACTIVE",
}
