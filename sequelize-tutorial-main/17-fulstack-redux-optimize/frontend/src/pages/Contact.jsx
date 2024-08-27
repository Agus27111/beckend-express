import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteKontak,
  detailKontak,
  getContactList,
} from "../features/contactSlice";
import Menu from "../components/Menu";
import ContackForm from "../components/ContackForm";
import Table from "react-bootstrap/Table";
import { Button, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function Contact() {
  const data = useSelector((state) => state.contact.data);
  const dataDelete = useSelector((state) => state.contact.dataDelete);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  const actionDel = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Yakin akan dihapus?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteKontak(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  useEffect(() => {
    if (dataDelete) {
      Swal.fire({
        title: "Success !",
        text: dataDelete.message,
        icon: "success",
      });
      dispatch(getContactList());
    }
  }, [dataDelete, dispatch]);
  return (
    <div>
      <Menu />
      <Container>
        <div className="mt-3">
          <ContackForm show={modalShow} onHide={() => setModalShow(false)} />
          <Button
            variant="primary btn-sm me-3"
            onClick={() => {
              dispatch(
                detailKontak({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  Addresses: [
                    {
                      addressType: "",
                      street: "",
                      city: "",
                      province: "",
                      country: "",
                      zipCode: "",
                    },
                  ],
                })
              );
              setModalShow(true);
            }}
          >
            Tambah
          </Button>
          {loading ? "Loading..." : ""}
        </div>
        <Row>
          <Table className="mt-3" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Tlp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((kontak, index) => {
                  return (
                    <tr key={kontak.contactId}>
                      <td>{index + 1}</td>
                      <td>{kontak.fullName}</td>
                      <td>{kontak.email}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => actionDel(kontak.contactId)}
                        >
                          Delete
                        </button>
                        <button
                          className="ms-2 btn btn-primary btn-sm"
                          onClick={() => {
                            dispatch(detailKontak(kontak)), setModalShow(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : loading ? (
                <tr>
                  {/* <td colSpan={4}>Loading...</td> */}
                  <td colSpan={4}></td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>{error ? error : "data kosong"}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
