import React, { useState } from "react";

const Loguoting = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function handleLogout() {
        setIsAuthenticated(false);
        // Тут можно добавить логику для выхода пользователя из аккаунта
    }

    return (
        <div>
            {isAuthenticated && (
                <button onClick={handleLogout}>Выйти из аккаунта</button>
            )}
            {/* Тут можно добавить другие компоненты приложения */}
        </div>
    );
}

export default Loguoting;