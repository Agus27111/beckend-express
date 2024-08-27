import React, { useEffect } from "react";
import { useAppState } from "../contexts/AppState";
import Table from "react-bootstrap/Table";
import { Button, Container, Row } from "react-bootstrap";
import {
  deleteKontak,
  detailKontak,
  getKontakList,
} from "../actions/ContactActions";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/contact/InputForm";
import Menu from "../components/Menu";
import Swal from "sweetalert2";

function Contact() {
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useAppState();
  const {
    getKontakResult,
    getKontakLoading,
    getKontakError,
    deleteKontakResult,
  } = state;

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
        deleteKontak(dispatch, id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  useEffect(() => {
    getKontakList(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (deleteKontakResult) {
      getKontakList(dispatch);
    }
  }, [dispatch, deleteKontakResult]);
  useEffect(() => {
    if (getKontakError == "401") {
      navigate("/login");
    }
  });
  return (
    <div>
      <Menu />
      <Container>
        <div className="mt-3">
          <InputForm show={modalShow} onHide={() => setModalShow(false)} />
          <Button
            variant="primary btn-sm"
            onClick={() => {
              detailKontak(dispatch, {
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
              });
              setModalShow(true);
            }}
          >
            Tambah
          </Button>
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
              {getKontakResult ? (
                getKontakResult.map((kontak, index) => {
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
                            detailKontak(dispatch, kontak), setModalShow(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : getKontakLoading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>
                    {getKontakError ? getKontakError : "data kosong"}
                  </td>
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
