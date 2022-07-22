import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

import Swal from "sweetalert2";
import useAdminController from "../../../src/hooks/useAdminController";

let AVATAR_IDX = 0;

const getAvatarByOrder = () => {
  const avatars = [user1, user2, user3, user4, user5];

  if (AVATAR_IDX > avatars.length - 1) {
    AVATAR_IDX = 0;
  }

  const randomAvatar = avatars[AVATAR_IDX];

  AVATAR_IDX++;

  return randomAvatar;
};

const ProjectTables = ({ admins, setAdminsData }) => {
  const { Admin } = useAdminController();

  const deleteAdmin = ({ name, id }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you want to delete the <span style="color: red; font-weight: bold">${name}</span> from the admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Admin.delete({
          data: { id },
          cb: async () => {
            const admins = await Admin.getAll();
            setAdminsData(admins);

            Swal.fire("Deleted!", `${name} has been deleted.`, "success");
          },
        });
      }
    });
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Admins</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the Admins
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Info</th>
                <th>Postion</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, idx) => (
                <tr key={idx} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <Image
                        src={getAvatarByOrder()}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{admin.name}</h6>
                        <span className="text-muted">{admin.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted m-0">
                      {admin.super ? "Super admin" : "Admin"}
                    </p>
                  </td>
                  <td>
                    <i
                      className="bi bi-person-x-fill fs-5 bg-danger text-light px-2 py-2 rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteAdmin({ name: admin.name, id: admin.id })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
