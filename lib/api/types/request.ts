export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface CreateCardRequest {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface UpdateCardRequest {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export interface UpdateColumnRequest {
  title: string;
}

export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface UpdateDashboardRequest {
  title: string;
  color: string;
}

export interface DashboardInviteRequest {
  email: string;
}

export interface DashboardInviteAcceptRequest {
  inviteAccepted: true;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UserProfileUpdateRequest {
  nickname: string;
  profileImageUrl: string;
}
