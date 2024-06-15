import { useContext } from "react";
import usePublicAxios from "../../hooks/usePublicAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const Assignment = ({ assignment, index }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = usePublicAxios();
  console.log("koi", assignment);
  const { assignmentDeadline, assignmentDescription, assignmentTitle } =
    assignment.data;

  const handleAssignmentSubmit = async (assign) => {
    const assignment = {
      title: assign.title,
      assignmentInfo: assign.data,
      assignmentId: assign._id,
      user: user?.displayName,
      email: user?.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit this assignment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.post("/assignmentSubmit", assignment);
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Assignment submit successful.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    // <div className="border rounded-lg p-10 max-w-[600px] space-y-3">
    //   <h1 className="text-2xl font-bold">
    //     Assignmet : {assignment.data.assignmentTitle}
    //   </h1>
    //   <p className="text-lg">{assignment.data.assignmentDescription}</p>
    //   <h2 className="text-xl font-semibold text-red-800">
    //     Deadline : {assignment.data.assignmentDeadline}
    //   </h2>
    // </div>

    <tr>
      <th>{index + 1}</th>
      <td>{assignmentTitle}</td>
      <td>{assignmentDescription}</td>
      <td>{assignmentDeadline}</td>
      <td>
        <button
          className="btn btn-sm bg-orange-700 text-white hover:text-black"
          onClick={() => handleAssignmentSubmit(assignment)}
        >
          Submit
        </button>
      </td>
    </tr>
  );
};

export default Assignment;
