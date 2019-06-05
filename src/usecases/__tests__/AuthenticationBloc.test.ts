// import AuthenticationBloc from "../AuthenticationBloc";

// describe("AuthenticationBloc", () => {
//   describe("#signIn()", () => {
//     test("signs in to obtain a session and store it to a storage", async () => {
//       const sessionStorable = {
//         signIn: jest.fn()
//       };

//       const signable = {
//         saveSession: jest.fn()
//       };

//       const authenticationBloc = new AuthenticationBloc({
//         sessionStorable,
//         signable
//       });

//       await authenticationBloc.signIn();

//       expect(sessionStorable.signIn).toHaveBeenCalled();
//       expect(signable.saveSession).toHaveBeenCalled();
//     });
//   });
// });
