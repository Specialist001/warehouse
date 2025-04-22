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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->uuid('warehouse_id');
            $table->uuid('product_id');
            $table->enum('type', ['in', 'out']);
            $table->integer('quantity');
            $table->enum('status', ['pending', 'completed', 'cancelled']);
            $table->boolean('is_internal_transfer')->default(false);
            $table->string('source')->nullable();
            $table->string('destination')->nullable();
            $table->unsignedBigInteger('executor_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('executor_id')->references('id')->on('users')->onDelete('set null');

            $table->index(['warehouse_id', 'product_id']);
            $table->index('source');
            $table->index('destination');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
