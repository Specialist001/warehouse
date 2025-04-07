<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));;
            $table->text('name')->nullable()->default(null);
            $table->text('short_description')->nullable()->default(null);
            $table->boolean('is_active')->default(true);
            $table->string('logo')->nullable();
            $table->unsignedInteger('order_num')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        // create trigger for generating uuid for id field
        DB::unprepared('
            CREATE TRIGGER categories_generate_uuid
            BEFORE INSERT ON categories
            FOR EACH ROW
                SET NEW.id = UUID()
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
