import * as React from "react";
import toast, { Toaster } from 'react-hot-toast';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { duration, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "@/app/api/users";

type Props = 
{
    id: string
    name: string
}

const UserDeleteModal = ({id, name}: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => 
    {
        handleClose()
        queryClient.invalidateQueries({queryKey: ['users']})
        toast.success("Gebruiker is verwijderd", {duration: 4000, position: "bottom-right" })
    }
  })

  const deleteUser = () => 
  {
    mutation.mutate({_id: id})
  }

  return (
    <div>
      <Toaster />
      <Button onClick={handleOpen}>
        <FaRegTrashAlt color="white" size={"20px"} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        
      >
        <Box className="absolute top-1/4 left-2/4 -translate-x-10 -translate-y-10 w-1/4 p-10  bg-secondary">
            <Box component={"article"} className="flex flex-col items-center justify-center gap-2">
            <CgDanger color="white" size={"45px"} />
            <Typography color={"white"} fontWeight={"bold"} fontSize={"20px"}>Verwijder Gebruiker</Typography>
            <Typography color={"white"} align="center" fontSize={"15px"}>Je gaat de gebruiker <b>{name}</b> verwijderen. Weet je het zeker?</Typography>
            <Box component={'div'} className="flex justify-center items-center gap-5 mt-5">
            <Button onClick={handleClose} color="secondary" variant="outlined">Terug</Button>
            <Button onClick={deleteUser} color="warning" variant="outlined">Verwijderen</Button>
            </Box>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDeleteModal