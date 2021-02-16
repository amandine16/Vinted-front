// UPLOAD IMG DROPZONE
// <Dropzone
//   onDrop={(acceptedFiles) => {
//     console.log(acceptedFiles);
//     setPreviewImg(URL.createObjectURL(acceptedFiles[0]));
//   }}
// >
//   {({ getRootProps, getInputProps }) => (
//     <section>
//       <div className="input-file" {...getRootProps()}>
//         <input
//           {...getInputProps()}
//           onChange={(e) => {
//             handlePublish(e, "picture");

//             setPreviewImg(
//               URL.createObjectURL(e.target.files[0])
//             );
//             {
//               console.log(e.target.files[0]);
//             }
//           }}
//         />
//         <p>
//           Drag 'n' drop some files here, or click to select
//           files
//         </p>
//       </div>
//     </section>
//   )}
// </Dropzone>
