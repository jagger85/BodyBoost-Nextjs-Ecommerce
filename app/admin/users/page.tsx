import { Metadata } from "next";
import { getAllUsers } from "@/lib/actions/user.actions";
export const metadata:Metadata = {
    title: 'Admin Users'
}

const AdminUserPage = async (props: {
    searchParams : Promise<{
        page: string
    }>
}) => {

    const { page = '1' } = await props.searchParams

    const users = await getAllUsers({page: Number(page)})

    
    return ( <>User</> );
}
 
export default AdminUserPage;