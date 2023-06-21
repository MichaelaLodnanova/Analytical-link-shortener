export class UserNotFound extends Error {
  constructor() {
    super('User not found');
    // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}

export class UserAlreadyExists extends Error {
  type: 'email' | 'username' | null;
  constructor(type: 'email' | 'username' | null = null) {
    super('User already exists');
    this.type = type;
    Object.setPrototypeOf(this, UserAlreadyExists.prototype);
  }
}

export class DeletedRecordError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DeletedRecordError.prototype);
  }
}

export class NonexistentRecordError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NonexistentRecordError.prototype);
  }
}
